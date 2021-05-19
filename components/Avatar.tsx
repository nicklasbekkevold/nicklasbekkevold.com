import Image from 'next/image';

const Avatar: React.FC = () => (
  <Image
    src="/images/profile_capra.jpg"
    alt="Nicklas Bekkevold"
    width="64"
    height="64"
  />
);

export default Avatar;
