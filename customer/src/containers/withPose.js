import posed from 'react-pose';

const withPose = (Component, x, y) => posed(Component)({
  before: {
    x: '100vw'
  },
  enter: {
    x: '0vw'
  },
  exit: {
    x: '-100vw'
  },
  transition: {
    type: 'spring',
    stiffness: 300,
    damping: 25,
    restDelta: 0.5,
    restSpeed: 10
  }
});

export default withPose;
