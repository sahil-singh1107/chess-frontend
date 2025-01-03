import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
    username: z
        .string()
        .min(5, { message: "Username must contain at least 5 characters" })
        .max(50, { message: "Username cannot be longer than 50 characters" }),
    password: z
        .string()
        .nonempty()
        .min(8, { message: "Password must be at least 8 characters long" })
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i, {
            message:
                "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character",
        }),
});

const Signin = () => {

    let navigate = useNavigate();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const res = await axios.post("http://localhost:3000/login", {
                username: values.username,
                password: values.password
            })
            localStorage.setItem("username", res.data);
            navigate("/game");
        } catch (error) {
            console.log(error);
            return;
        }
    }

    return (
        <div className="bg-[#302E2B] h-screen flex items-center justify-center">
            <div className="w-full max-w-md p-8">
                <div className="flex flex-col space-y-6 text-center">
                    <span className="text-white font-bold text-4xl">
                        Enter your email and password
                    </span>
                    <span className="text-[#B6B7B5] font-bold text-2xl">
                        Login to your account
                    </span>
                </div>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6 mt-8"
                    >
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            
                                            placeholder="Username"
                                            {...field}
                                            className="placeholder-[#9E9D9C] bg-[#444241] border-[#595655] w-full rounded-sm text-[#B4A49B] hover:border-[#6A6968] focus:border-[#6A6968]"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="Password"
                                            {...field}
                                            className="bg-[#444241] placeholder-[#9E9D9C] border-[#595655] w-full rounded-sm text-[#B4A49B] hover:border-[#6A6968] focus:border-[#6A6968]"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            type="submit"
                            className="w-full bg-[#80B64D] text-white h-16 font-bold text-2xl rounded-lg border-b-4 border-[#44753D] hover:bg-[#9BD45E] hover:border-[#5B8F49] transition duration-200"
                        >
                            Submit
                        </Button>
                    </form>
                </Form>
                <div className="h-[0.1px] bg-[#444241] mt-6"></div>
                <p className="text-white mt-3 hover:underline focus:underline hover:cursor-pointer" onClick={() => {navigate("/signup")}}>Signup</p>
            </div>
        </div>
    );
}

export default Signin;
