// import { Deepgram } from "@deepgram/sdk";

// const deepgram = new Deepgram("YOUR_DEEPGRAM_API_KEY");

// const startListening = async () => {
//   try {
//     const dgSocket = deepgram.transcription.live({
//       punctuate: true,
//       language: "en",
//     });

//     dgSocket.on("open", () => console.log("✅ Connected to Deepgram"));

//     dgSocket.on("data", (data) => {
//       const transcript = data?.results?.channels[0]?.alternatives[0]?.transcript;
//       if (transcript) console.log("🎤 User:", transcript);
//     });

//     // Get Microphone Stream
//     const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//     const mediaRecorder = new MediaRecorder(stream, { mimeType: "audio/webm" });

//     mediaRecorder.ondataavailable = async (event) => {
//       if (dgSocket.readyState === WebSocket.OPEN) {
//         dgSocket.send(event.data);
//       }
//     };

//     mediaRecorder.start(250);
//     console.log("🎙️ Listening...");

//   } catch (err) {
//     console.error("❌ Error:", err);
//   }
// };

// startListening();
import { createClient } from "@deepgram/sdk";

export async function POST(req) {
  try {
    // Deepgram API Client बनाओ
    const deepgram = createClient("26168536e0867e4474db6ff95a6caa8a427ee2fa");

    // Response भेजो
    return Response.json({ message: "Deepgram API Connected!" });
  } catch (error) {
    console.error("Deepgram API Error:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
