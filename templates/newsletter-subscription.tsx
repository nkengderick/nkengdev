import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

interface NewsletterSubscriptionEmailProps {
  email: string;
}

export const NewsletterSubscriptionEmail = ({
  email,
}: NewsletterSubscriptionEmailProps) => {
  const previewText = "Thank you for subscribing to my newsletter!";

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-gray-100 font-sans">
          <Container className="bg-white p-8 rounded-lg shadow-lg my-8 mx-auto max-w-xl">
            <Img
              src="https://portfolio-117q.onrender.com/images/logo.png"
              alt="Logo"
              width="120"
              height="40"
              className="mx-auto mb-6"
            />

            <Heading className="text-xl font-bold text-center text-gray-800 mb-4">
              Welcome to My Newsletter!
            </Heading>

            <Text className="text-gray-700 mb-4">Hello there,</Text>

            <Text className="text-gray-700 mb-4">
              Thank you for subscribing to my newsletter with {email}! You&lsquo;ll
              now receive updates about my latest projects, tech insights, and
              career developments.
            </Text>

            <Section className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded">
              <Text className="text-gray-700">
                <strong>What to expect:</strong> I send newsletters monthly with
                valuable content about web development, new technologies, and my
                recent work. No spam, I promise!
              </Text>
            </Section>

            <Text className="text-gray-700 mb-6">
              While you wait for the first newsletter, feel free to check out my
              latest projects and connect with me on social media.
            </Text>

            <Section className="text-center mb-6">
              <Button
                href="https://portfolio-117q.onrender.com/projects"
                className="bg-blue-600 text-white py-3 px-6 rounded-md font-medium"
              >
                Explore My Work
              </Button>
            </Section>

            <Hr className="border-gray-200 my-6" />

            <Text className="text-gray-700 mb-4">Best regards,</Text>
            <Text className="text-gray-700 font-bold mb-2">
              Nkengbeza Derick
            </Text>
            <Text className="text-gray-600 text-sm">Full-Stack Developer</Text>

            <Section className="mt-8">
              <Text className="text-xs text-gray-500 text-center">
                Connect with me:
              </Text>
              <Text className="text-xs text-center text-gray-500">
                <Link
                  href="https://github.com/nkengderick"
                  className="text-blue-600 underline"
                >
                  GitHub
                </Link>{" "}
                |
                <Link
                  href="https://linkedin.com/in/nkengbezaderick"
                  className="text-blue-600 underline"
                >
                  {" "}
                  LinkedIn
                </Link>{" "}
                |
                <Link
                  href="https://portfolio-117q.onrender.com/"
                  className="text-blue-600 underline"
                >
                  {" "}
                  Portfolio
                </Link>
              </Text>
              <Text className="text-xs text-gray-500 text-center mt-2">
                If you didn&lsquo;t subscribe to this newsletter, you can safely
                ignore this email.
              </Text>
              <Text className="text-xs text-gray-500 text-center mt-1">
                <Link href="#" className="text-blue-600 underline">
                  Unsubscribe
                </Link>{" "}
                •
                <Link
                  href="https://portfolio-117q.onrender.com/privacy"
                  className="text-blue-600 underline"
                >
                  {" "}
                  Privacy Policy
                </Link>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default NewsletterSubscriptionEmail;
