"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
    Button,
    Card,
    Flex,
    Notification,
    PasswordInput,
    TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";

export default function SigninPage() {
    const [doesUserExist, setUserStatus] = useState(false);
    const [visible, setVisible] = useState(false);

    const showNotification = () => setVisible(true);
    const hideNotification = () => setVisible(false);

    const form = useForm({
        mode: "controlled",
        initialValues: { Username: "", Passwd: "", RePasswd: "" },
        validate: {
            Username: (value) => (value.length == 0 ? "Enter Username" : null),
            Passwd: (value) => (value.length == 0 ? "Must be filled" : null),
            RePasswd: (value, values) =>
                value.length == 0
                    ? "Must be filled"
                    : value !== values.Passwd
                    ? "Passwords don't match"
                    : null,
        },
    });

    const router = useRouter();
    const handleNav: Function = () => {
        router.push("/Main");
    };

    const handleSubmit = (val: typeof form.values) => {
        fetch("/api/py/new-user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(val),
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                if (data) {
                    console.log(data);
                    setUserStatus(false);
                    handleNav();
                } else {
                    showNotification();
                    setUserStatus(true);
                    console.log(data);
                }
            });
    };

    return (
            <Card shadow="sm" padding="lg" radius="md" withBorder>
                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <TextInput
                        {...form.getInputProps("Username")}
                        key={form.key("Username")}
                        size="md"
                        label=""
                        placeholder="UserName"
                    />
                    <PasswordInput
                        {...form.getInputProps("Passwd")}
                        key={form.key("Passwd")}
                        mt="md"
                        size="md"
                        label=""
                        placeholder="Password"
                    />
                    <PasswordInput
                        {...form.getInputProps("RePasswd")}
                        key={form.key("RePasswd")}
                        mt="md"
                        size="md"
                        label=""
                        placeholder="Re-Enter Password"
                    />
                    <Flex className="justify-center">
                        <Button size="compact-md" type="submit" mt="md">
                            Submit
                        </Button>
                    </Flex>
                    {doesUserExist && visible && (
                        <Notification
                            color="red"
                            title="Success!"
                            onClose={hideNotification}
                            closeButtonProps={{
                                "aria-label": "Close notification",
                            }}
                        >
                            Username Exists
                        </Notification>
                    )}
                </form>
            </Card>
    );
}
