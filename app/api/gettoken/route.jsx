// import { AssemblyAI } from "assemblyai";
// import { NextResponse } from "next/server";

// export async function GET() {
// //   const apiKey = process.env.ASSEMBLY_API_KEY;
//     const apiKey = "bbbf3d1743e745be8d83129dcbd8d685";
  
//   if (!apiKey) {
//     return NextResponse.json({ error: "API key is missing" }, { status: 500 });
//   }

//   const assemblyAi = new AssemblyAI({ apikey: apiKey });

//   try {
//     const token = await assemblyAi.realtime.createTemporaryToken({
//       expires_in: 3600,
//     });
//     return NextResponse.json(token);
//   } catch (error) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }
import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.DEEPGRAM_API_KEY || "c9c2c3d9e98b5e54454f8a7ce39f9f448a8d7c4f"; 

  if (!apiKey) {
    return NextResponse.json({ error: "API key is missing" }, { status: 500 });
  }

  try {
    const response = await fetch("https://api.deepgram.com/v1/projects", {
      headers: {
        "Authorization": `Token ${apiKey}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Deepgram API Error: ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json({ token: apiKey, projectData: data });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
