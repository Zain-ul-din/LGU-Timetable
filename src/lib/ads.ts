export const AVAILABLE_ADS = [
  {
    title: 'Educative',
    link: 'https://click.linksynergy.com/fs-bin/click?id=oQaDKQaTta0&offerid=1095549.10&bids=1095549.10&type=3&subid=0',
    description: 'Get a free trial at Educative and get access to hundreds of programming courses!'
  },
  {
    title: 'Educative',
    link: 'https://click.linksynergy.com/fs-bin/click?id=oQaDKQaTta0&offerid=1095549.8&bids=1095549.8&type=3&subid=0',
    description: 'Level up your tech skills and stay ahead of the curve with Educative learning paths'
  },
  {
    title: 'Educative',
    link: 'https://click.linksynergy.com/fs-bin/click?id=oQaDKQaTta0&offerid=1095549.7&bids=1095549.7&type=3&subid=0',
    description: 'Learn in-demand tech skills and accelerate your career with curated learning paths'
  },
  {
    title: 'Educative',
    link: 'https://click.linksynergy.com/fs-bin/click?id=oQaDKQaTta0&offerid=1095549.6&bids=1095549.6&type=3&subid=0',
    description: 'Curated programming Paths for seamless learning. Accelerate your programming skills on Educative.'
  },
  {
    title: 'Educative',
    link: 'https://click.linksynergy.com/fs-bin/click?id=oQaDKQaTta0&offerid=1095549.9&bids=1095549.9&type=3&subid=0',
    description: 'Accelerate your programming skills with a 7-day Educative Trial'
  },
  {
    title: 'Educative',
    link: 'https://click.linksynergy.com/fs-bin/click?id=oQaDKQaTta0&offerid=1095549.4&bids=1095549.4&type=3&subid=0',
    description: 'Master in-demand tech skills in half the time with Educative'
  },
  {
    title: 'Educative',
    link: 'https://click.linksynergy.com/fs-bin/click?id=oQaDKQaTta0&offerid=1095549.5&bids=1095549.5&type=3&subid=0',
    description: 'Learn something new every day with Educative Unlimited'
  },
  {
    title: 'Educative',
    link: 'https://click.linksynergy.com/fs-bin/click?id=oQaDKQaTta0&offerid=1095549.3&bids=1095549.3&type=3&subid=0',
    description: 'Learn in-demand programming languages interactively on Educative'
  }
]

export default function getAd() {
  return AVAILABLE_ADS[Math.floor(Math.random() * AVAILABLE_ADS.length)];
}
