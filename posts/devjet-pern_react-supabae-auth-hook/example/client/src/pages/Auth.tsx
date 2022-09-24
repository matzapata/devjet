import React, { useState } from "react";
import {
  Button,
  Center,
  Container,
  Divider,
  Heading,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useAuth } from "utils/authHook";

function EmailAndPassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn, signUp, signOut, user, loading } = useAuth();

  return (
    <VStack>
      <Heading size="md" mb="2" color="white">
        Email and password
      </Heading>
      <Input
        required
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        required
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        disabled={user !== null}
        isLoading={loading}
        w="full"
        onClick={() => signIn({ email, password })}
      >
        SignIn
      </Button>
      <Button
        disabled={user !== null}
        isLoading={loading}
        w="full"
        onClick={() => signUp({ email, password })}
      >
        SignUp
      </Button>
      <Button
        disabled={user === null}
        isLoading={loading}
        w="full"
        onClick={() => signOut()}
      >
        SignOut
      </Button>
    </VStack>
  );
}

function EmailMagicLink() {
  const [email, setEmail] = useState("");
  const { user, signIn, loading } = useAuth();

  return (
    <VStack>
      <Heading size="md" mb="2" color="white">
        Email magic link
      </Heading>
      <Input
        required
        type="email"
        value={email}
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button
        disabled={user !== null}
        isLoading={loading}
        w="full"
        onClick={() => signIn({ email })}
      >
        SignIn
      </Button>
    </VStack>
  );
}

function ResetPasswordForEmail() {
  const [email, setEmail] = useState("");
  const { user, loading, resetPasswordForEmail } = useAuth();

  return (
    <VStack>
      <Heading size="md" mb="2" color="white">
        Reset Password
      </Heading>
      <Input
        required
        type="email"
        value={email}
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button
        disabled={user !== null}
        isLoading={loading}
        w="full"
        onClick={() => resetPasswordForEmail(email)}
      >
        Reset
      </Button>
    </VStack>
  );
}

function Auth() {
  const { user, loading, errorMessage } = useAuth();

  return (
    <Center bg="gray.900" minH="100vh" py="20">
      <Container>
        <VStack>
          <Heading size="md" mb="2" color="white">
            User Data
          </Heading>
          {user && (
            <Text color="white" textAlign="center">
              {JSON.stringify(user)}
            </Text>
          )}
          {!user && (
            <Text color="white" textAlign="center">
              No User
            </Text>
          )}
          {errorMessage && (
            <Text textAlign="center" color="red.500">
              {errorMessage}
            </Text>
          )}
          {loading && (
            <Text color="white" textAlign="center">
              Loading...
            </Text>
          )}
        </VStack>

        <Divider my="8" />
        <EmailAndPassword />
        <Divider my="8" />
        <EmailMagicLink />
        <Divider my="8" />
        <ResetPasswordForEmail />
      </Container>
    </Center>
  );
}

export default Auth;
