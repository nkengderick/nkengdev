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

interface ContactFormConfirmationProps {
  name: string;
}

export const ContactFormConfirmation = ({
  name,
}: ContactFormConfirmationProps) => {
  const previewText = `Thank you for contacting me, ${name}!`;

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
              Thank You for Reaching Out!
            </Heading>

            <Text className="text-gray-700 mb-4">Hello {name},</Text>

            <Text className="text-gray-700 mb-4">
              I&lsquo;ve received your message and appreciate you taking the time to
              get in touch. I&lsquo;ll review your message and get back to you as soon
              as possible, typically within 24-48 hours.
            </Text>

            <Section className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded">
              <Text className="text-gray-700">
                If your inquiry is urgent, please feel free to call me at{" "}
                <strong>+237 681 390 155</strong>.
              </Text>
            </Section>

            <Text className="text-gray-700 mb-6">
              In the meantime, feel free to check out my projects and learn more
              about my skills and experience.
            </Text>

            <Section className="text-center mb-6">
              <Button
                href="https://portfolio-117q.onrender.com/projects"
                className="bg-blue-600 text-white py-3 px-6 rounded-md font-medium"
              >
                View My Projects
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
                This is an automated response to your contact form submission.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ContactFormConfirmation;
