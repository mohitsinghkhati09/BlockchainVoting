import face_recognition
import os
import cv2
import numpy as np

path = 'C:\\Users\\rohit\\Blockchain-Based-E-Voting-System-using-Facial-Recognition-1\\project\\server\\Faces'

print(f"Scanning path: {path}")

if not os.path.exists(path):
    print(f"❌ Directory {path} does not exist.")
    exit()

classNames = []
images = []

for file in os.listdir(path):
    file_path = os.path.join(path, file)
    if os.path.isfile(file_path):
        img = cv2.imread(file_path)
        if img is not None:
            images.append(img)
            classNames.append(os.path.splitext(file)[0])
        else:
            print(f"⚠️ Could not read image: {file_path}")

def findEncodings(images):
    encodeList = []
    for img in images:
        try:
            print(f"⏳ Processing: shape={img.shape}, dtype={img.dtype}")
            if img.shape[0] > 1000 or img.shape[1] > 1000:
                img = cv2.resize(img, (1000, int(img.shape[0] * 1000 / img.shape[1])))
            
            img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
            encodings = face_recognition.face_encodings(img_rgb)

            if encodings:
                encodeList.append(encodings[0])
                print("✅ Face encoded")
            else:
                print("❌ No face found in image")
        except Exception as e:
            print(f"❌ Error: {e}")
    return encodeList

encoded_face_train = findEncodings(images)

print(f"✅ Encoded {len(encoded_face_train)} face(s)")
print(f"Class Names: {classNames}")
