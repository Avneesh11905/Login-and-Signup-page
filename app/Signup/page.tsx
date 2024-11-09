import SigninPage from "@/components/SignupPage";
import { Flex } from "@mantine/core";



export default function Page(){
    return(
        <Flex className="h-[100vh] w-full justify-center items-center">
            <SigninPage/>
        </Flex>
    )
}