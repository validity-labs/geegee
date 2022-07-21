import { FAQGroup } from '@/typings/app';
import { Quote, StaticImageData } from '@/typings/app';

const contentWithHtml = (field: string = 'Unknown') =>
  `<p>${field} cupidatat deserunt eiusmod qui <strong>dolore</strong> dolor <a href="https://example.com">cillum</a> dolore id eiusmod ex culpa. Fugiat nostrud labore deserunt ea aliquip incididunt proident nulla elit excepteur laborum non aliqua. Exercitation ad sint aliqua proident ut in magna. In nostrud officia consequat dolore adipisicing amet. Consectetur aliqua Lorem anim voluptate. Ut qui enim aute dolor adipisicing veniam ut occaecat laborum commodo consectetur eiusmod esse.</p><p>Cupidatat deserunt eiusmod qui dolore dolor cillum dolore id eiusmod ex culpa. Fugiat nostrud labore deserunt ea aliquip incididunt proident nulla elit excepteur laborum non aliqua. Exercitation ad sint aliqua proident ut in magna. In nostrud officia consequat dolore adipisicing amet. Consectetur aliqua Lorem anim voluptate.&nbsp;</p><ul><li>Ut qui enim aute dolor adipisicing veniam.</li><li>Ut occaecat laborum commodo consectetur eiusmod esse.</li></ul>`;

export default contentWithHtml;

export const staticImageData: StaticImageData = {
  src: '/images/static.jpg',
  width: 100,
  height: 100,
};

export const reviews: Quote[] = [
  {
    id: '1',
    quote:
      'Aliqua consequat officia reprehenderit dolore incididunt est incididunt pariatur nisi voluptate laboris labore ea. Ex eiusmod ea quis non velit aute non reprehenderit. Amet nulla officia cillum irure. Enim voluptate anim id in aute dolor cillum laborum. Proident cupidatat quis labore fugiat id labore. Incididunt aliqua non est nulla eu est non minim veniam exercitation. Ea do ipsum cupidatat nostrud sit.',
    name: 'John Doe',
    position: 'CEO',
    portrait: {
      url: 'example.jpg',
      caption: 'John Doe',
      alt: 'John Doe',
    },
    thumbnail: {
      url: 'example.jpg',
      caption: 'John Doe',
      alt: 'John Doe',
    },
  },
  {
    id: '2',
    quote:
      'Sunt nisi cillum mollit sit dolor ut in deserunt. Enim sunt nisi sit deserunt deserunt. Deserunt laborum eu aute anim voluptate ut mollit laborum elit amet exercitation. Consectetur ipsum duis cillum ea elit elit aliqua ut ut cupidatat elit. Duis consequat fugiat mollit laborum et enim nisi. Veniam pariatur id aute sit Lorem. Incididunt enim reprehenderit qui ea aliqua culpa dolore.',
    name: 'Jim Doe',
    position: 'Developer',
    portrait: {
      url: 'example.jpg',
      caption: 'Jim Doe',
      alt: 'Jim Doe',
    },
    thumbnail: {
      url: 'example.jpg',
      caption: 'Jim Doe',
      alt: 'Jim Doe',
    },
  },
  {
    id: '3',
    quote:
      'Esse elit excepteur exercitation ipsum pariatur quis eu mollit commodo esse incididunt irure et. Proident exercitation sit elit proident et. Deserunt ea tempor proident exercitation anim.',
    name: 'Jane Doe',
    position: 'Designer',
    portrait: {
      url: 'example.jpg',
      caption: 'Jane Doe',
      alt: 'Jane Doe',
    },
    thumbnail: {
      url: 'example.jpg',
      caption: 'Jane Doe',
      alt: 'Jane Doe',
    },
  },
];

export const faqGroupInfo: FAQGroup<'platform' | 'company'>[] = [
  { key: 'platform', count: 3 },
  { key: 'company', count: 3 },
];
