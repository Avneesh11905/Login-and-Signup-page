"use client";
import { Flex, Card, Group } from "@mantine/core";
import { Button} from "@mantine/core";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    
    return (
        <Flex className="h-[100vh] w-[100vw] items-center justify-center">
            <Card shadow="sm" padding="lg" radius="md" withBorder >
                <Group>

                <Button
                    onClick={(event) => {
                        event.preventDefault();
                        router.push("/Signup");
                    }}
                    >Sign Up
                </Button>
                <Button
                    onClick={(event) => {
                        event.preventDefault();
                        router.push("/Login");
                    }}
                    >Login
                </Button>
                    </Group>
            </Card>
        </Flex>
    );
}
