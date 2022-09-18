import React, { useState } from "react";
import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { useUser } from "@supabase/auth-helpers-react";
import axios from "axios";
import { useRouter } from "next/router";

function LifetimePlanCard({
  currentPlan,
}: {
  currentPlan?: "lifetime" | "quarterly";
}) {
  const { user } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const isCurrentPlan = currentPlan === "lifetime";

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
      border={isCurrentPlan ? "4px" : "2px"}
      borderColor={isCurrentPlan ? "blue.500" : "gray.200"}
      maxW={{ base: "", sm: "300px" }}
      borderRadius="4"
      textAlign="center"
      _hover={
        isCurrentPlan
          ? {}
          : {
              shadow: "xl",
              border: "none",
              outline: "solid",
              outlineColor: "blue.500",
              outlineWidth: "4px",
            }
      }
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
        disabled={isCurrentPlan}
        isLoading={loading}
        onClick={() => getLifetimeAccess()}
        colorScheme="blue"
        w="full"
      >
        {isCurrentPlan
          ? "Current plan"
          : currentPlan === "quarterly"
          ? "Upgrade"
          : "Select"}
        {}
      </Button>
    </Box>
  );
}

export default LifetimePlanCard;
