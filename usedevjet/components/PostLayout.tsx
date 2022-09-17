import React, { useEffect, useState } from "react";
import Head from "next/head";
import { parseISO, format } from "date-fns";
import {
  Heading,
  Text,
  Flex,
  Container,
  Tag,
  HStack,
  Icon,
} from "@chakra-ui/react";
import { Prose } from "@nikolovlazar/chakra-ui-prose";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Post } from "contentlayer/generated";
import ToggleReadingList from "components/ToggleReadingList";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
} from "react-share";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { ClipboardDocumentIcon } from "@heroicons/react/24/solid";

function PostLayout({ post, children }: { post: Post; children: JSX.Element }) {
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    setShareUrl(window.location.href);
  }, []);

  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <Container as="article" w="full" maxW="container.md">
        <NavBar />
        <Flex justifyContent="space-between" mt="16" alignItems="center">
          <Text fontSize="sm">
            {format(parseISO(post.date), "MMMM dd, yyyy")}
          </Text>
          <HStack spacing="4">
            <FacebookShareButton url={shareUrl}>
              <Icon h="4" color="gray.500" as={FaFacebookF} />
            </FacebookShareButton>
            <TwitterShareButton url={shareUrl}>
              <Icon h="4" color="gray.500" as={FaTwitter} />
            </TwitterShareButton>
            <LinkedinShareButton url={shareUrl}>
              <Icon h="4" color="gray.500" as={FaLinkedinIn} />
            </LinkedinShareButton>
            <Icon
              h="4"
              color="gray.500"
              cursor="pointer"
              onClick={() => {
                navigator.clipboard.writeText(shareUrl);
              }}
              as={ClipboardDocumentIcon}
            />

            <ToggleReadingList postSlug={post.slug} />
          </HStack>
        </Flex>
        <Heading letterSpacing="tight" mb="2" mt="2" as="h1" size="2xl">
          {post.title}
        </Heading>
        <Text mt="4">{post.summary}</Text>
        <Flex justifyContent="space-between" mt="2" alignItems="center">
          <Flex>
            {post.tags?.map((t, i) => (
              <Tag size="sm" mr="2" key={i}>
                {t}
              </Tag>
            ))}
          </Flex>
        </Flex>

        <Prose className="prose" mb="20">
          {children}
        </Prose>

        <Footer />
      </Container>
    </>
  );
}

export default PostLayout;
