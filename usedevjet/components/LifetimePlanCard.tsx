import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { useUser } from "@supabase/auth-helpers-react";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";

function LifetimePlanCard() {
  const { user } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const getLifetimeAccess = async () => {
    if (!user) router.push("/auth/signin");
    setLoading(true);
    try {
      const res = await axios.get("/api/plans/lifetime");
      router.push(res.data.init_point);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      p="6"
      border="2px"
      borderColor="blue.500"
      maxW="300px"
      borderRadius="4"
      textAlign="center"
      _hover={{ borderColor: "blue.500", borderWidth: "4px" }}
    >
      <Heading size="lg" mb="2">
        $2000
      </Heading>
      <Heading size="sm" mb="4">
        Lifetime access!!
      </Heading>
      <Text mb="6">
        Give your career a boost. <br /> Pay once and access all content forever
      </Text>
      <Button
        isLoading={loading}
        onClick={() => getLifetimeAccess()}
        colorScheme="blue"
        w="full"
      >
        Select
      </Button>
    </Box>
  );
}

export default LifetimePlanCard;
