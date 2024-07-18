import { Container, Paper, Text } from "@mantine/core";

export function CompleteSection() {
  setTimeout(function () {
    window.location.replace("/infolomba");
  }, 5000);
  return (
    <Container size="sm">
      <Paper>
        <Text size="xl" w={700} style={{ marginBottom: "1rem" }}>
          Terima Kasih
        </Text>
        <Text size="md" style={{ marginBottom: "2rem" }}>
          Lomba kamu telah berhasil diupload, kamu akan di arahkan ke halaman
          utama sebentar lagi
        </Text>
      </Paper>
    </Container>
  );
}
