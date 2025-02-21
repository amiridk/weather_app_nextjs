"use server";
import bcrypt from "bcryptjs";
import { User } from "./models";
import { connectToDb } from "./utils";
import { revalidatePath } from "next/cache";

export const CreateNewAccount = async (previousState, formData) => {
  const { email, password, rep_password } = Object.fromEntries(formData);

  const name = email;
  if (password !== rep_password) {
    return { error: "رمز عبور را درست تکرار کنید" };
  }
  if (password.length < 8) {
    return { error: "رمزعبور حداقل 8 کاراکتر باشد" };
  }
  try {
    connectToDb();
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return { error: "با این ایمیل قبلتر عضو شده ای" };
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      username: name,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    return { success: true };
  } catch (err) {
    console.log(err);
    return { error: "مشکلی پیش امده" };
  }
};

export const HandleUserFav = async (email, data) => {
  try {
    connectToDb();
    await User.findOneAndUpdate({ email }, { favItems: data });
    revalidatePath("/dashboard");
  } catch (err) {
    console.log(err);
  }
};
export const HandleUserFavAdd = async (email, data) => {
  try {
    connectToDb();
    const checkUser = await User.findOne({ email });
    const newData = [...checkUser.favItems];
    const finalData = newData.filter((e) => e != data);
    await User.findOneAndUpdate({ email }, { favItems: finalData });
    revalidatePath("/dashboard");
  } catch (err) {
    console.log(err);
  }
};

export const getUserFav = async (email) => {
  try {
    connectToDb();
    const user = await User.findOne({ email });
    if (!user) {
      console.log("user not found");
    }

    return user.favItems;
  } catch (err) {
    console.log(err);
  }
};
