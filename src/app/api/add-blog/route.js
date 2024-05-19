import connecToDb from "@/database";
import Blog from "@/model/blog";
import Joi from "joi";
import { NextResponse } from "next/server";

const addNewblog = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
});

export async function POST(req) {
  try {
    await connecToDb();

    const blogData = await req.json();

    console.log("asd", blogData);

    const { title, description } = blogData;

    console.log("asd", title, description);

    const { error } = addNewblog.validate({ title, description });

    if (error) {
      return NextResponse.json({
        success: false,
        message: error.details[0].message,
      });
    }

    const newBlog = await Blog.create(blogData);

    if (newBlog) {
      return NextResponse.json({
        success: true,
        data: newBlog,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Something went wrong",
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
}
