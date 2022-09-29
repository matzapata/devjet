import React from "react";
import {
  Box,
  Button,
  Heading,
  List,
  ListIcon,
  ListItem,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";

function LifetimePlanCard({ isPro }: { isPro: boolean }) {
  return (
    <Box
      p="6"
      border={isPro ? "4px" : "2px"}
      borderColor={isPro ? "blue.500" : "gray.200"}
      maxW={{ base: "", sm: "400px" }}
      borderRadius="4"
      w="full"
      textAlign="center"
      _hover={
        isPro
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
        $10 USD
      </Heading>
      <Heading size="md" mb="4">
        Unlimited access!!
      </Heading>
      <Button
        as="a"
        href={isPro ? "#" : "https://usedevjet.gumroad.com/l/all-access"}
        disabled={isPro}
        colorScheme="blue"
        w="full"
      >
        {isPro ? "Current plan" : "Get License"}
      </Button>
      <List
        spacing="1"
        display="flex"
        flexDir="column"
        mt="4"
        alignItems="center"
      >
        <ListItem>
          <ListIcon as={CheckIcon} color="green.600" />
          All PERN code receipes and generators
        </ListItem>
        <ListItem>
          <ListIcon as={CheckIcon} color="green.600" />
          All Nextjs code receipes and generators
        </ListItem>
        <ListItem>
          <ListIcon as={CheckIcon} color="green.600" />
          Free updates
        </ListItem>
      </List>
    </Box>
  );
}

export default LifetimePlanCard;
