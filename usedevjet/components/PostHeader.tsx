import React, { useEffect, useState } from "react";
import {
  Flex,
  Heading,
  HStack,
  Icon,
  Tag,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from "react-share";
import { PostMetadata } from "types/Post";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { ClipboardDocumentIcon } from "@heroicons/react/24/solid";
import { format, parseISO } from "date-fns";
import Head from "next/head";

function PostHeader({ postMetadata }: { postMetadata: PostMetadata }) {
  const [shareUrl, setShareUrl] = useState("");
  const [copyLabel, setCopyLabel] = useState("Copy to clipboard");

  useEffect(() => {
    setShareUrl(window.location.href);
  }, []);

  return (
    <>
      <Head>
        <title>{postMetadata.title}</title>
      </Head>
      <Flex justifyContent="space-between" mt="16" alignItems="center">
        {postMetadata.comingsoon ? (
          <Tag colorScheme="green">Coming soon</Tag>
        ) : (
          <Text fontSize="sm">
            {format(parseISO(postMetadata.date), "MMMM dd, yyyy")}
          </Text>
        )}
        <HStack spacing="4">
          <Tooltip label="Share on facebook">
            <FacebookShareButton url={shareUrl}>
              <Icon h="4" color="gray.500" as={FaFacebookF} />
            </FacebookShareButton>
          </Tooltip>
          <Tooltip label="Share on twitter">
            <TwitterShareButton url={shareUrl}>
              <Icon h="4" color="gray.500" as={FaTwitter} />
            </TwitterShareButton>
          </Tooltip>
          <Tooltip label="Share on linkedin">
            <LinkedinShareButton url={shareUrl}>
              <Icon h="4" color="gray.500" as={FaLinkedinIn} />
            </LinkedinShareButton>
          </Tooltip>
          <Tooltip label={copyLabel}>
            <Icon
              h="4"
              color="gray.500"
              cursor="pointer"
              onClick={() => {
                navigator.clipboard.writeText(shareUrl);
                setCopyLabel("Copied to clipboard");
              }}
              as={ClipboardDocumentIcon}
            />
          </Tooltip>
        </HStack>
      </Flex>
      <Heading letterSpacing="tight" mb="2" mt="2" as="h1" size="2xl">
        {postMetadata.title}
      </Heading>
      <Text mt="4">{postMetadata.summary}</Text>
      <Flex justifyContent="space-between" mt="2" alignItems="center">
        <Flex>
          {postMetadata.tags?.map((t, i) => (
            <Tag size="sm" mr="2" key={i}>
              {t}
            </Tag>
          ))}
        </Flex>
      </Flex>
    </>
  );
}

export default PostHeader;
