import { Welcome } from '@/components/Welcome/Welcome';
import { ColorSchemeToggle } from '@/components/ColorSchemeToggle/ColorSchemeToggle';
import VideoEmbed from "@/components/VideoEmbed/VideoEmbed";

export default function HomePage() {
  return (
    <>
      <Welcome />
        <VideoEmbed />
      <ColorSchemeToggle />
    </>
  );
}
