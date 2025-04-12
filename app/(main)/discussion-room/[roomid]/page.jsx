// "use client";

// import { api } from "@/convex/_generated/api";
// import { CoachingExpert } from "@/services/Options";
// import { useQuery } from "convex/react";
// import { useParams } from "next/navigation";
// import React, { useEffect, useRef, useState } from "react";
// import Image from "next/image";
// import { UserButton } from "@stackframe/stack";
// import { Button } from "@/components/ui/button";
// import dynamic from "next/dynamic";
// import { getToken } from "@/services/GlobleServices";

// const RecordRTC = dynamic(() => import("recordrtc"), { ssr: false });

// function DiscussionRoom() {
//   const { roomid } = useParams();
//   const discussionRoomData = useQuery(api.DiscussionRoom.GetDiscussionRoom, { id: roomid });
//   const [expert, setExpert] = useState(null);
//   const [isMicEnabled, setIsMicEnabled] = useState(false);
//   const recorder = useRef(null);
//   const realTimeTranscriber = useRef(null);
//   let silenceTimeout;

//   useEffect(() => {
//     if (discussionRoomData) {
//       setExpert(CoachingExpert.find(item => item.name === discussionRoomData.expertName));
//     }
//   }, [discussionRoomData]);

//   const connectToServer = async () => {
//     setIsMicEnabled(true);
    
//     realTimeTranscriber.current = new realTimeTranscriber({
//       token: await getToken(),
//       sample_rate: 16000
//     });

//     realTimeTranscriber.current.on("transcript", (transcript) => {
//       console.log(transcript);
//     });
    
//     await realTimeTranscriber.current.connect();

//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//       const RecordRTC = (await import("recordrtc")).default;

//       recorder.current = new RecordRTC(stream, {
//         type: "audio",
//         mimeType: "audio/webm;codecs=pcm",
//         recorderType: RecordRTC.StereoAudioRecorder,
//         timeSlice: 250,
//         desiredSampleRate: 16000,
//         numberOfAudioChannels: 1,
//         bufferSize: 4096,
//         audioBitsPerSecond: 128000,
//         ondataavailable: async (blob) => {
//           if (!realTimeTranscriber.current) return;
          
//           clearTimeout(silenceTimeout);
//           const buffer = await blob.arrayBuffer();
//           realTimeTranscriber.current.sendAudio(buffer);

//           silenceTimeout = setTimeout(() => {
//             console.log("User stopped talking");
//           }, 2000);
//         },
//       });

//       recorder.current.startRecording();
//       console.log("Recording started...");
//     } catch (err) {
//       console.error("Media access error:", err);
//     }
//   };

//   const disconnect = async (e) => {
//     e.preventDefault();
//     await realTimeTranscriber.current?.close();
//     recorder.current?.stopRecording(() => {
//       console.log("Recording stopped.");
//       recorder.current = null;
//     });
//     setIsMicEnabled(false);
//   };

//   return (
//     <div className="-mt-18">
//       <h2 className="text-lg font-bold">{discussionRoomData?.coachingOption}</h2>

//       <div className="mt-5 grid grid-cols-1 lg:grid-cols-3 gap-10">
//         <div className="col-span-2">
//           <div className="h-[60vh] bg-secondary rounded-4xl flex flex-col justify-center items-center relative">
//             {expert?.avatar && (
//               <Image
//                 src={expert.avatar}
//                 alt="Expert Avatar"
//                 width={200}
//                 height={200}
//                 className="h-[170px] w-[170px] object-cover rounded-full animate-pulse"
//               />
//             )}
//             <h2 className="text-gray-500">{expert?.name}</h2>
//             <div className="p-5 bg-gray-200 px-10 rounded-lg absolute bottom-10 right-10">
//               <UserButton />
//             </div>
//           </div>

//           <div className="mt-5 flex items-center justify-center">
//             {!isMicEnabled ? (
//               <Button onClick={connectToServer}>Connect</Button>
//             ) : (
//               <Button variant="destructive" onClick={disconnect}>Disconnect</Button>
//             )}
//           </div>
//         </div>

//         <div>
//           <div className="h-[60vh] bg-secondary rounded-4xl flex flex-col justify-center items-center relative">
//             <h2>Chat Section</h2>
//           </div>
//           <h2 className="mt-4 text-gray-400 text-sm">
//             At the end of the conversation, we automatically generate feedback/notes based on your discussion.
//           </h2>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default DiscussionRoom;







// // "use client";

// // import { useEffect, useRef, useState } from "react";
// // import { useParams } from "next/navigation";
// // import { Button } from "@/components/ui/button";

// // function DiscussionRoom() {
// //   const { roomid } = useParams();
// //   const [isMicEnabled, setIsMicEnabled] = useState(false);
// //   const ws = useRef(null);
// //   const recorder = useRef(null);

// //   const connectToServer = async () => {
// //     setIsMicEnabled(true);

// //     // Deepgram WebSocket Setup
// //     ws.current = new WebSocket("wss://api.deepgram.com/v1/listen?access_token=26168536e0867e4474db6ff95a6caa8a427ee2fa");

// //     ws.current.onopen = () => {
// //       console.log("Connected to Deepgram WebSocket");
// //     };

// //     ws.current.onmessage = (event) => {
// //       const data = JSON.parse(event.data);
// //       if (data.channel && data.channel.alternatives[0].transcript) {
// //         console.log("User:", data.channel.alternatives[0].transcript);
// //       }
// //     };

// //     ws.current.onerror = (error) => {
// //       console.error("WebSocket Error:", error);
// //     };

// //     ws.current.onclose = () => {
// //       console.log("Disconnected from Deepgram");
// //     };

// //     try {
// //       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
// //       const mediaRecorder = new MediaRecorder(stream, { mimeType: "audio/webm" });

// //       mediaRecorder.ondataavailable = async (event) => {
// //         if (ws.current && ws.current.readyState === WebSocket.OPEN) {
// //           ws.current.send(event.data);
// //         }
// //       };

// //       mediaRecorder.start(250);
// //       recorder.current = mediaRecorder;
// //     } catch (err) {
// //       console.error("Media access error:", err);
// //     }
// //   };

// //   const disconnect = () => {
// //     if (ws.current) {
// //       ws.current.close();
// //     }
// //     if (recorder.current) {
// //       recorder.current.stop();
// //     }
// //     setIsMicEnabled(false);
// //   };

// //   return (
// //     <div>
// //       <h2 className="text-lg font-bold">Discussion Room</h2>
// //       <div className="mt-5 flex items-center justify-center">
// //         {!isMicEnabled ? (
// //           <Button onClick={connectToServer}>Connect</Button>
// //         ) : (
// //           <Button variant="destructive" onClick={disconnect}>Disconnect</Button>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // export default DiscussionRoom;


// "use client";

// import { api } from "@/convex/_generated/api";
// import { CoachingExpert } from "@/services/Options";
// import { useQuery } from "convex/react";
// import { useParams } from "next/navigation";
// import React, { useEffect, useRef, useState } from "react";
// import Image from "next/image";
// import { UserButton } from "@stackframe/stack";
// import { Button } from "@/components/ui/button";
// import dynamic from "next/dynamic";
// import { getToken } from "@/services/GlobleServices";

// const RecordRTC = dynamic(() => import("recordrtc"), { ssr: false });

// function DiscussionRoom() {
//   const { roomid } = useParams();
//   const discussionRoomData = useQuery(api.DiscussionRoom.GetDiscussionRoom, { id: roomid });
//   const [expert, setExpert] = useState(null);
//   const [isMicEnabled, setIsMicEnabled] = useState(false);
//   const recorder = useRef(null);
//   const deepgramSocket = useRef(null);

//   useEffect(() => {
//     if (discussionRoomData) {
//       setExpert(CoachingExpert.find(item => item.name === discussionRoomData.expertName));
//     }
//   }, [discussionRoomData]);

//   const connectToServer = async () => {
//     setIsMicEnabled(true);
    
//     try {
//       const token = await getToken();
//       if (!token) {
//         console.error("❌ Failed to get API token");
//         return;
//       }

//       console.log("✅ Using Token:", token);

//       deepgramSocket.current = new WebSocket(`wss://api.deepgram.com/v1/listen?access_token=${token}`);

//       deepgramSocket.current.onopen = () => {
//         console.log("✅ Connected to Deepgram!");

//         deepgramSocket.current.send(JSON.stringify({ 
//           type: "start", 
//           key: token,
//           encoding: "linear16", 
//           sample_rate: 16000 
//         }));
//       };

//       deepgramSocket.current.onmessage = (event) => {
//         try {
//           const data = JSON.parse(event.data);
//           console.log("📝 Transcript:", data.channel.alternatives[0]?.transcript);
//         } catch (err) {
//           console.log("❌ Error parsing WebSocket message:", err);
//         }
//       };

//       deepgramSocket.current.onerror = (error) => {
//         console.log("❌ WebSocket Error:", error);
//       };

//       deepgramSocket.current.onclose = () => {
//         console.warn("⚠️ WebSocket Disconnected");
//       };

//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//       const RecordRTC = (await import("recordrtc")).default;

//       recorder.current = new RecordRTC(stream, {
//         type: "audio",
//         mimeType: "audio/webm",
//         recorderType: RecordRTC.StereoAudioRecorder,
//         timeSlice: 250,
//         desiredSampleRate: 16000,
//         numberOfAudioChannels: 1,
//         ondataavailable: async (blob) => {
//           if (deepgramSocket.current?.readyState === WebSocket.OPEN) {
//             const buffer = await blob.arrayBuffer();
//             deepgramSocket.current.send(buffer);
//           } else {
//             console.warn("⚠️ WebSocket is not open, skipping data send");
//           }
//         },
//       });

//       recorder.current.startRecording();
//       console.log("🎙️ Recording started...");
//     } catch (err) {
//       console.error("❌ Error in connectToServer:", err);
//       setIsMicEnabled(false);
//     }
//   };

//   const disconnect = (e) => {
//     e.preventDefault();
//     if (deepgramSocket.current) {
//       deepgramSocket.current.close();
//     }
//     if (recorder.current) {
//       recorder.current.stopRecording(() => {
//         console.log("🛑 Recording stopped.");
//         recorder.current = null;
//       });
//     }
//     setIsMicEnabled(false);
//   };

//   return (
//     <div className="-mt-18">
//       <h2 className="text-lg font-bold">{discussionRoomData?.coachingOption}</h2>
//       <div className="mt-5 grid grid-cols-1 lg:grid-cols-3 gap-10">
//         <div className="col-span-2">
//           <div className="h-[60vh] bg-secondary rounded-4xl flex flex-col justify-center items-center relative">
//             {expert?.avatar && (
//               <Image
//                 src={expert.avatar}
//                 alt="Expert Avatar"
//                 width={200}
//                 height={200}
//                 className="h-[170px] w-[170px] object-cover rounded-full animate-pulse"
//               />
//             )}
//             <h2 className="text-gray-500">{expert?.name}</h2>
//             <div className="p-5 bg-gray-200 px-10 rounded-lg absolute bottom-10 right-10">
//               <UserButton />
//             </div>
//           </div>
//           <div className="mt-5 flex items-center justify-center">
//             {!isMicEnabled ? (
//               <Button onClick={connectToServer}>Connect</Button>
//             ) : (
//               <Button variant="destructive" onClick={disconnect}>Disconnect</Button>
//             )}
//           </div>
//         </div>
//         <div>
//           <div className="h-[60vh] bg-secondary rounded-4xl flex flex-col justify-center items-center relative">
//             <h2>Chat Section</h2>
//           </div>
//           <h2 className="mt-4 text-gray-400 text-sm">
//             At the end of the conversation, we automatically generate feedback/notes based on your discussion.
//           </h2>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default DiscussionRoom;








// "use client";

// import { useParams } from "next/navigation";
// import { useQuery } from "convex/react";
// import { api } from "@/convex/_generated/api";
// import { CoachingExpert } from "@/services/Options";
// import Image from "next/image";
// import { UserButton } from "@stackframe/stack";
// import { useEffect, useState } from "react";

// function DiscussionRoom() {
//   const { roomid } = useParams();
//   const discussionRoomData = useQuery(api.DiscussionRoom.GetDiscussionRoom, { id: roomid });
//   const [expert, setExpert] = useState(null);

//   useEffect(() => {
//     if (discussionRoomData) {
//       setExpert(CoachingExpert.find(item => item.name === discussionRoomData.expertName));
//     }
//   }, [discussionRoomData]);

//   return (
//     <div className="-mt-18">
//       <h2 className="text-lg font-bold">{discussionRoomData?.coachingOption}</h2>
//       <div className="mt-5 grid grid-cols-1 lg:grid-cols-3 gap-10">
//         <div className="col-span-2">
//           <div className="h-[60vh] bg-secondary rounded-4xl flex flex-col justify-center items-center relative">
//             {expert?.avatar && (
//               <Image
//                 src={expert.avatar}
//                 alt="Expert Avatar"
//                 width={200}
//                 height={200}
//                 className="h-[170px] w-[170px] object-cover rounded-full animate-pulse"
//               />
//             )}
//             <h2 className="text-gray-500">{expert?.name}</h2>

//             <div className="p-5 bg-gray-200 px-10 rounded-lg absolute bottom-10 right-10">
//               <UserButton />
//             </div>
//           </div>

//           {/* ✅ Embed ElevenLabs Widget */}
//           <div className="mt-5 flex items-center justify-center">
//             <div>
//               <elevenlabs-convai agent-id="8ZbpxsSTgPRo1Tn6aOyo"></elevenlabs-convai>
//               <script
//                 src="https://elevenlabs.io/convai-widget/index.js"
//                 async
//                 type="text/javascript"
//               ></script>
//             </div>
//           </div>
//         </div>

//         <div>
//           <div className="h-[60vh] bg-secondary rounded-4xl flex flex-col justify-center items-center relative">
//             <h2>Chat Section</h2>
//           </div>
//           <h2 className="mt-4 text-gray-400 text-sm">
//             At the end of the conversation, we automatically generate feedback/notes based on your discussion.
//           </h2>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default DiscussionRoom;





// "use client";

// import { useParams } from "next/navigation";
// import { useQuery } from "convex/react";
// import { api } from "@/convex/_generated/api";
// import { CoachingExpert } from "@/services/Options";
// import Image from "next/image";
// import { UserButton } from "@stackframe/stack";
// import { useEffect, useState } from "react";
// import Script from "next/script";

// function DiscussionRoom() {
//   const { roomid } = useParams();
//   const discussionRoomData = useQuery(api.DiscussionRoom.GetDiscussionRoom, { id: roomid });
//   const [expert, setExpert] = useState(null);

//   useEffect(() => {
//     if (discussionRoomData) {
//       setExpert(CoachingExpert.find(item => item.name === discussionRoomData.expertName));
//     }
//   }, [discussionRoomData]);

//   return (
//     <div className="-mt-18">
//       <h2 className="text-lg font-bold">{discussionRoomData?.coachingOption}</h2>

//       <div className="mt-5 grid grid-cols-1 lg:grid-cols-3 gap-10">
//         {/* Left Side - Expert + ElevenLabs */}
//         <div className="col-span-2">
//           <div className="h-[60vh] bg-secondary rounded-4xl flex flex-col justify-center items-center relative">
//             {expert?.avatar && (
//               <Image
//                 src={expert.avatar}
//                 alt="Expert Avatar"
//                 width={200}
//                 height={200}
//                 className="h-[170px] w-[170px] object-cover rounded-full animate-pulse"
//               />
//             )}
//             <h2 className="text-gray-500">{expert?.name}</h2>

//             <div className="p-5 bg-gray-200 px-10 rounded-lg absolute bottom-10 right-10">
//               <UserButton />
//             </div>
//           </div>

//           {/* ElevenLabs Widget */}
//           <div className="mt-5 flex items-center justify-center">
//             <div>
//               {/* <elevenlabs-convai agent-id="8ZbpxsSTgPRo1Tn6aOyo"></elevenlabs-convai>
//               <Script
//                 src="https://elevenlabs.io/convai-widget/index.js"
//                 async
//                 type="text/javascript"
//               /> */}
              


//               <elevenlabs-convai agent-id="f4Ge9ZuSac739ltw5yvd"></elevenlabs-convai>
//               <Script
//                 src="https://elevenlabs.io/convai-widget/index.js"
//                 async
//                 type="text/javascript"
//               />



//             </div>
//           </div>
//         </div>

//         {/* Right Side - Chatling Chatbot */}
//         <div className="w-full">
//           <div className="h-[60vh] bg-secondary rounded-4xl overflow-hidden">
//             <div className="w-full h-full">
//               <div id="chatling-inline-bot" className="w-full h-full" />
//             </div>
//           </div>

//           <h2 className="mt-4 text-gray-400 text-sm">
//             At the end of the conversation, we automatically generate feedback/notes based on your discussion.
//           </h2>

//           {/* ✅ Load Chatling Script */}
//           <Script id="chatling-config" strategy="beforeInteractive">
//             {`
//               window.chtlConfig = {
//                 chatbotId: "7591168229",
//                 display: "page_inline"
//               };
//             `}
//           </Script>
//           <Script
//             id="chatling-script"
//             strategy="lazyOnload"
//             async
//             src="https://chatling.ai/js/embed.js"
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default DiscussionRoom;





"use client";

import { useParams } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { CoachingExpert } from "@/services/Options";
import Image from "next/image";
import { UserButton } from "@stackframe/stack";
import { useEffect, useState } from "react";
import Script from "next/script";

function DiscussionRoom() {
  const { roomid } = useParams();
  const discussionRoomData = useQuery(api.DiscussionRoom.GetDiscussionRoom, { id: roomid });
  const [expert, setExpert] = useState(null);
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);

  useEffect(() => {
    if (discussionRoomData) {
      setExpert(CoachingExpert.find(item => item.name === discussionRoomData.expertName));
    }
  }, [discussionRoomData]);

  useEffect(() => {
    // // Auto-remove the ElevenLabs widget after 1.5 minutes
    // const timeout = setTimeout(() => {
    //   const widget = document.querySelector("elevenlabs-convai");
    //   if (widget && widget.parentNode) {
    //     widget.parentNode.removeChild(widget);
    //     setShowPaymentPopup(true);
    //   }
    // }, 90000); // 1.5 minutes

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="-mt-18">
      <h2 className="text-lg font-bold">{discussionRoomData?.coachingOption}</h2>

      <div className="mt-5 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Side - Expert + ElevenLabs */}
        <div className="col-span-2">
          <div className="h-[60vh] bg-secondary rounded-4xl flex flex-col justify-center items-center relative">
            {expert?.avatar && (
              <Image
                src={expert.avatar}
                alt="Expert Avatar"
                width={200}
                height={200}
                className="h-[170px] w-[170px] object-cover rounded-full animate-pulse"
              />
            )}
            <h2 className="text-gray-500">{expert?.name}</h2>

            <div className="p-5 bg-gray-200 px-10 rounded-lg absolute bottom-10 right-10">
              <UserButton />
            </div>
          </div>

          {/* ElevenLabs Widget */}
          {!showPaymentPopup && (
            <div className="mt-5 flex items-center justify-center">
              <div>
              {/* agent-id="f4Ge9ZuSac739ltw5yvd" */}
              {/* agent-id="nyULwulEb516KKAxAzbr" */}
              {/* agent-id:-"Fpqr2QpErMFnvxKgpDIj" */}
              {/* dBXPmoFDogDMI3u6OylT */}


<elevenlabs-convai agent-id="Fpqr2QpErMFnvxKgpDIj"></elevenlabs-convai>
                <Script
                  src="https://elevenlabs.io/convai-widget/index.js"
                  async
                  type="text/javascript"
                />


              </div>
            </div>
          )}

          {/* Payment Popup
          {showPaymentPopup && (
            <div className="mt-6 p-6 bg-white shadow-xl border rounded-xl text-center">
              <h2 className="text-xl font-semibold text-red-500 mb-2">⚠️ Conversation limit reached!</h2>
              <p className="mb-4">Please scan the QR code to continue for just ₹10 and write a message "Pragya Ai"</p>
              <Image
                src="/qrcode.jpg"
                alt="Payment QR Code"
                width={200}
                height={200}
                className="mx-auto"
              />
            </div>
          )} */}
        </div>

        {/* Right Side - Chatling Chatbot */}
        <div className="w-full">
          <div className="h-[60vh] bg-secondary rounded-4xl overflow-hidden">
            <div className="w-full h-full">
              <div id="chatling-inline-bot" className="w-full h-full" />
            </div>
          </div>

          <h2 className="mt-4 text-gray-400 text-sm">
            At the end of the conversation, we automatically generate feedback/notes based on your discussion.
          </h2>

          {/* ✅ Load Chatling Script */}
          <Script id="chatling-config" strategy="beforeInteractive">
            {`
              window.chtlConfig = {
                chatbotId: "7591168229",
                display: "page_inline"
              };
            `}
          </Script>
          <Script
            id="chatling-script"
            strategy="lazyOnload"
            async
            src="https://chatling.ai/js/embed.js"
          />
        </div>
      </div>
    </div>
  );
}

export default DiscussionRoom;
