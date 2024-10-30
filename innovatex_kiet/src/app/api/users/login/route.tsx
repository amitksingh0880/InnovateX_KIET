// import User from "@/models/userModel";
// import { NextRequest, NextResponse } from "next/server";
// import bcryptjs from "bcryptjs";
// import JWT from "jsonwebtoken";
// import { connect } from "@/db/db";

// connect();

// export async function POST(request : NextRequest, response : NextResponse){
//     try {
//         const reqBody = await request.json();

//         const { email, password } = reqBody;

//     const user = User.findOne({emial : email});

//     if(!user) return NextResponse.json({error : "User Not Exist"}, {status : 400});

//     const compairPass = await bcryptjs.compare(password, user.password);
//     if(!compairPass) return NextResponse.json({error : "User Password is Incorrect"})

//     const tokenData = {
//         id: user._id,
//         username: user.username,
//         email: user.email,
//     }

//     const token = await JWT.sign(tokenData, process.env.TOKEN_SECRET_KEY!, {expiresIn : '1d'})

//     response.cookies.set("token" , token, { httpOnly : true})

//     return NextResponse.json({message : "user Logged in successfully"},{ status: 200 })
//     } catch (error : any) {
//         return NextResponse.json({ error: error.message }, { status: 500 });
//     }
// }

// import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import JWT from "jsonwebtoken";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/user";

connectToDatabase();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    // Find the user by email
    const user = await User.findOne({ email: email });

    // If user doesn't exist, return an error
    if (!user) {
      return NextResponse.json({ error: "User Not Exist" }, { status: 400 });
    }

    // Compare the provided password with the stored hashed password
    const comparePass = await bcryptjs.compare(password, user.password);

    // If the password is incorrect, return an error
    if (!comparePass) {
      return NextResponse.json(
        { error: "User Password is Incorrect" },
        { status: 400 }
      );
    }

    // Token data for the JWT
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    // Generate JWT token
    const token = await JWT.sign(tokenData, process.env.TOKEN_SECRET_KEY!, {
      expiresIn: "1d",
    });

    // Create a response and set the token in the cookie
    const response = NextResponse.json(
      { message: "User Logged in successfully", success: true, token: token },
      { status: 200 }
    );
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    // Return the response
    return NextResponse.json({ success: true, userId: user._id, username: user.name });
  } catch (error: any) {
    // Return error response
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}