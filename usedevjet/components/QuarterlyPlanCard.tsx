import React, { useState } from "react";
import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { useUser } from "@supabase/auth-helpers-react";
import axios from "axios";
import { useRouter } from "next/router";

function QuarterlyPlanCard() {
  const { user } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const getQuarterlyAccess = async () => {
    if (!user) router.push("/auth/signin");
    setLoading(true);
    try {
      const res = await axios.get("/api/plans/quarter");
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
      border="1px"
      borderColor="gray.200"
      maxW="300px"
      borderRadius="4"
      textAlign="center"
      _hover={{ borderColor: "blue.500", borderWidth: "2px" }}
    >
      <Heading size="lg" mb="2">
        $1500
      </Heading>
      <Heading size="sm" mb="4">
        3 Months access
      </Heading>
      <Text mb="6">
        Give your project a boost. <br /> Pay once and access all content for 3
        months
      </Text>
      <Button
        isLoading={loading}
        onClick={() => getQuarterlyAccess()}
        colorScheme="blue"
        w="full"
      >
        Select
      </Button>
    </Box>
  );
}

export default QuarterlyPlanCard;
