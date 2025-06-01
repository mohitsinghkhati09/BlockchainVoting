import cv2
import face_recognition
import numpy as np
import webbrowser
from encoded import encoded_face_train, classNames

cap = cv2.VideoCapture(0)
cap.set(cv2.CAP_PROP_FRAME_WIDTH, 1024)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 768)

if not encoded_face_train or not classNames:
    print("❌ No trained face encodings found. Check encoded.py.")
    exit()

flag = 0
ans = []
index = 0

while True:
    index += 1
    if index == 500:
        print("❗ Frame limit reached")
        break

    success, img = cap.read()
    if not success:
        print("❌ Failed to capture image")
        break

    imgS = cv2.resize(img, (0, 0), fx=0.25, fy=0.25)
    imgS = cv2.cvtColor(imgS, cv2.COLOR_BGR2RGB)

    faces_in_frame = face_recognition.face_locations(imgS)
    encoded_faces = face_recognition.face_encodings(imgS, faces_in_frame)

    if not encoded_faces:
        print("⚠️ No faces detected in this frame")
        continue

    for encode_face, faceloc in zip(encoded_faces, faces_in_frame):
        faceDist = face_recognition.face_distance(encoded_face_train, encode_face)
        matchIndex = np.argmin(faceDist)

        print(f"Distances: {faceDist}")
        print(f"Closest match index: {matchIndex}, Distance: {faceDist[matchIndex]}")

        if faceDist[matchIndex] < 0.45:  # Adjustable threshold
            matched_name = classNames[matchIndex]
            ans.append(matched_name)
            flag += 1
            print(f"✅ Detected: {matched_name}")
            break
        else:
            print("❌ No valid match")

    if cv2.waitKey(1) & 0xFF == ord('q') or flag >= 10:
        break

cap.release()
cv2.destroyAllWindows()

most_common_face = max(set(ans), key=ans.count) if ans else "No face detected"
print(f"👤 Most detected face: {most_common_face}")

# Optional redirect after success
if most_common_face != "No face detected":
    webbrowser.open("http://localhost:3000/election/682dc82d650ebe45bd5b81a8")
