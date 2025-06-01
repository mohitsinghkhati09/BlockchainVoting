import { Button, Typography, Box, Grid, Paper } from "@mui/material";
import React, { useContext, useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import InputField from "../Components/Form/InputField";
import { ErrorMessage } from "../Components/Form/ErrorMessage";
import { TransactionContext } from "../context/TransactionContext";
import { serverLink, isFaceRecognitionEnable } from "../Data/Variables";
import { ObjectGroupBy } from "../Data/Methods";
import axios from "axios";
import Webcam from "react-webcam";

const Login = () => {
  const location = useLocation();
  const data = location.state.info;
  const { connectWallet, sendTransaction, getAllTransactions } = useContext(TransactionContext);
  const [election, setElection] = useState({});
  const webcamRef = useRef(null); // Webcam reference

  useEffect(() => {
    connectWallet();

    async function getData() {
      let link = `${serverLink}election/${data.election_id}`;
      try {
        let res = await axios.get(link);
        let election = res.data;
        setElection(election);
      } catch (error) {
        console.error("Error fetching election data:", error);
      }
    }
    getData();
  }, [connectWallet, data]);

  const checkDuplicateVote = async (user_id) => {
    try {
      let transactions = await getAllTransactions();
      var electionGroup = ObjectGroupBy(transactions, "election_id");
      var candidate = ObjectGroupBy(electionGroup[election._id], "user_id");
      if (candidate[user_id]?.length > 0) {
        alert("You already Voted");
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Error checking duplicate vote:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const password = e.target.password.value;
    const username = e.target.username.value;
    const tmp = { username, password };

    try {
      let check = await axios.post(`${serverLink}login`, tmp);
      if (check.status === 202) {
        alert(check.data);
      } else if (check.status === 201) {
        // If face recognition is enabled, capture image
        let capturedImage = null;
        if (isFaceRecognitionEnable && webcamRef.current) {
          capturedImage = webcamRef.current.getScreenshot();
          console.log("Captured image:", capturedImage);

          // Optional: Send image to backend for verification
          // await axios.post(`${serverLink}face/verify`, { image: capturedImage });
        }

        await connectWallet();
        await checkDuplicateVote(check.data._id);

        let trans = await sendTransaction(data.election_id, data.candidate_id, check.data._id);

        if (trans.valid) {
          await axios.post(`${serverLink}votingEmail`, { id: check.data._id });
          alert("Thank You For the Vote");
          window.location.href = "/";
        } else {
          alert(trans.mess);
        }
      }
    } catch (error) {
      console.error("Error during submission:", error);
      alert("An error occurred during the voting process. Please try again.");
    }
  };

  return (
    <div className="content">
      <form onSubmit={handleSubmit} method="POST">
        <Paper elevation={3}>
          <Box px={3} py={2}>
            <Typography variant="h6" align="center" margin="dense">
              Enter Credentials
            </Typography>
            <Grid container pt={3} spacing={3}>
              <Grid item xs={12}>
                <InputField
                  label="Username"
                  name="username"
                  fullWidth
                  value={data.user_username}
                  id="outlined-disabled"
                  disabled={isFaceRecognitionEnable}
                />
                <ErrorMessage />
              </Grid>
              <Grid item xs={12}>
                <InputField
                  label="Election Id"
                  name="election_id"
                  fullWidth
                  type="text"
                  value={data.election_id}
                  id="outlined-disabled"
                  disabled
                />
                <ErrorMessage />
              </Grid>
              <Grid item xs={12}>
                <InputField
                  label="Candidate Name"
                  name="candidate_name"
                  fullWidth
                  value={data.candidate_username}
                  id="outlined-disabled"
                  disabled
                />
                <ErrorMessage />
              </Grid>
              <Grid item xs={12}>
                <InputField
                  label="Password"
                  name="password"
                  fullWidth
                  type="password"
                  id="password"
                />
                <ErrorMessage />
              </Grid>

              {isFaceRecognitionEnable && (
                <Grid item xs={12}>
                  <Typography variant="subtitle1">Facial Capture</Typography>
                  <Webcam
                    ref={webcamRef}
                    audio={false}
                    screenshotFormat="image/jpeg"
                    width="100%"
                    height="auto"
                    videoConstraints={{ width: 640, height: 480, facingMode: "user" }}
                  />
                </Grid>
              )}
            </Grid>

            <Box mt={3}>
              <Button type="submit" variant="contained" color="primary">
                Vote
              </Button>
            </Box>
          </Box>
        </Paper>
      </form>
    </div>
  );
};

export default Login;
