import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

interface ContactFormEmailProps {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const ContactFormEmail = ({
  name,
  email,
  subject,
  message,
}: ContactFormEmailProps) => {
  const previewText = `New contact form submission from ${name}`;

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

            <Heading className="text-xl font-bold text-center text-gray-800 mb-6">
              New Contact Form Submission
            </Heading>

            <Section className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded">
              <Text className="font-bold text-gray-800 mb-1">
                Subject: {subject}
              </Text>
              <Text className="text-gray-600 text-sm">
                Received on {new Date().toLocaleDateString()} at{" "}
                {new Date().toLocaleTimeString()}
              </Text>
            </Section>

            <Section className="mb-6">
              <Text className="text-gray-800 font-bold mb-2">
                Contact Information:
              </Text>
              <Text className="text-gray-700 mb-1">Name: {name}</Text>
              <Text className="text-gray-700">
                Email:{" "}
                <Link
                  href={`mailto:${email}`}
                  className="text-blue-600 underline"
                >
                  {email}
                </Link>
              </Text>
            </Section>

            <Section className="border-t border-gray-200 pt-6 mb-6">
              <Text className="text-gray-800 font-bold mb-2">Message:</Text>
              <Text className="text-gray-700 whitespace-pre-wrap">
                {message}
              </Text>
            </Section>

            <Section className="bg-gray-100 p-4 rounded text-center">
              <Text className="text-sm text-gray-600">
                This email was sent from your portfolio website contact form.
              </Text>
              <Text className="text-sm text-gray-600">
                You can reply directly to this email to respond to {name}.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ContactFormEmail;
