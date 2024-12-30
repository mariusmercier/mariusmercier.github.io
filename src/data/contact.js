import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub';
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons/faLinkedinIn';
// import { faAngellist } from '@fortawesome/free-brands-svg-icons/faAngellist';
import { faXTwitter } from '@fortawesome/free-brands-svg-icons/faXTwitter';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons/faEnvelope';
import { faBluesky } from '@fortawesome/free-brands-svg-icons/faBluesky';
// See https://fontawesome.com/icons?d=gallery&s=brands,regular&m=free
// to add other icons.

const data = [
  {
    link: 'https://github.com/mariusmercier/',
    label: 'Github',
    icon: faGithub,
  },
  {
    link: 'https://www.linkedin.com/in/marius-m-b06775163/',
    label: 'LinkedIn',
    icon: faLinkedinIn,
  },
  {
    link: 'https://twitter.com/mariusmercier',
    label: 'X',
    icon: faXTwitter,
  },
  {
    link: 'mailto:mariusmercier1@gmail.com',
    label: 'Email',
    icon: faEnvelope,
  },
  {
    link: 'https://bsky.app/profile/mariusmercier.bsky.social',
    label: 'BlueSky',
    icon: faBluesky,
  },
];

export default data;
