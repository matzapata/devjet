import React from "react";
import {
  Box,
  Button,
  Divider,
  Heading,
  List,
  ListIcon,
  ListItem,
  Text,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";

function LifetimePlanCard() {
  return (
    <Box
      p="6"
      border={"2px"}
      borderColor={"gray.200"}
      maxW={{ base: "", sm: "400px" }}
      borderRadius="4"
      w="full"
      _hover={{
        shadow: "xl",
        border: "none",
        outline: "solid",
        outlineColor: "blue.500",
        outlineWidth: "4px",
      }}
    >
      <Heading size="xl" mb="2" textAlign="center">
        $10 USD
      </Heading>
      <Text mb="6" textAlign="center" color="gray.600" fontWeight="medium">
        One time payment
      </Text>
      <Button
        as="a"
        href="https://usedevjet.gumroad.com/l/all-access"
        colorScheme="blue"
        bg="blue.600"
        size="lg"
        w="full"
        borderRadius="3px"
      >
        Buy now
      </Button>
      <Divider my="6"></Divider>
      <List spacing="1" mt="4">
        <ListItem>
          <ListIcon as={CheckIcon} color="green.600" />
          React code recipes and generators
        </ListItem>
        <ListItem>
          <ListIcon as={CheckIcon} color="green.600" />
          Nextjs code recipes and generators
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
