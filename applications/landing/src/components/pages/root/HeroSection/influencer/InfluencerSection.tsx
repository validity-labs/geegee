import Image from 'next/image';

import { useMatomo } from '@datapunt/matomo-tracker-react';
import Stack from '@mui/material/Stack';

import Link from '@/components/general/Link/Link';
import influencer2 from '@/public/images/influencer/1.svg';
import influencer1 from '@/public/images/influencer/2.svg';
import influencer3 from '@/public/images/influencer/3.png';
import influencer4 from '@/public/images/influencer/4.png';
import influencer5 from '@/public/images/influencer/5.png';
import influencer6 from '@/public/images/influencer/6.png';
import influencer7 from '@/public/images/influencer/7.png';
import influencer8 from '@/public/images/influencer/8.png';
import influencer9 from '@/public/images/influencer/9.png';
import influencer10 from '@/public/images/influencer/10.png';
import influencer11 from '@/public/images/influencer/11.png';

interface Props {
  url: string;
  icon: any;
  mt?: number;
}

const Influencer = ({ url, icon, mt = 0 }: Props) => {
  const { trackEvent } = useMatomo();

  return (
    <Link onClick={() => trackEvent({ category: 'hero', action: 'influencer' })} href={url} target="_blank" style={{ marginTop: mt }}>
      <Image alt="Influencer" src={icon} width={99} height={99} />
    </Link>
  );
}

const InfluencerSection = () => {
  return (
    <Stack direction="row" spacing={3} sx={{ mt: 10 }}>
      <Influencer url="/" icon={influencer1} mt={0} />
      <Influencer url="/" icon={influencer2} mt={30} />
      <Influencer url="/" icon={influencer3} mt={30} />
      <Influencer url="/" icon={influencer4} mt={60} />
      <Influencer url="/" icon={influencer5} mt={30} />
      <Influencer url="/" icon={influencer6} mt={30} />
      <Influencer url="/" icon={influencer7} mt={30} />
      <Influencer url="/" icon={influencer8} mt={30} />
      <Influencer url="/" icon={influencer9} mt={0} />
      <Influencer url="/" icon={influencer10} mt={30} />
      <Influencer url="/" icon={influencer11} mt={60} />
    </Stack>
  );
};

export default InfluencerSection;
