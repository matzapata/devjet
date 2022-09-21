import React, { useState } from "react";
import { Box, Button, Heading, Text, useColorMode } from "@chakra-ui/react";
import { useUser } from "@supabase/auth-helpers-react";
import axios from "axios";
import { useRouter } from "next/router";

function QuarterlyPlanCard({
  currentPlan,
}: {
  currentPlan?: "lifetime" | "quarterly";
}) {
  const { user } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const isCurrentPlan = currentPlan === "quarterly";
  const isDisabled = currentPlan !== undefined;

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
      border="2px"
      borderColor={isDisabled ? "blue.100" : "gray.200"}
      maxW={{ base: "", sm: "300px" }}
      borderRadius="4"
      textAlign="center"
      _hover={isDisabled ? {} : { shadow: "lg" }}
    >
      <Heading size="lg" mb="2" color={isDisabled ? "gray.500" : ""}>
        $1500 ARS
      </Heading>
      <Heading size="sm" mb="4" color={isDisabled ? "gray.500" : ""}>
        3 Months access
      </Heading>
      <Text mb="6" color={isDisabled ? "gray.500" : ""}>
        Give your project a boost. <br /> Pay once and access all content for 3
        months
      </Text>
      <Button
        disabled={isDisabled}
        isLoading={loading}
        onClick={() => getQuarterlyAccess()}
        colorScheme="blue"
        w="full"
      >
        {isCurrentPlan ? "Current plan" : "Select"}
      </Button>
    </Box>
  );
}

export default QuarterlyPlanCard;
