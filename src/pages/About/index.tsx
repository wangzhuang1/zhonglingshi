import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../store';
import { increment } from '../../store/slices/counterSlice';
import { Button } from 'antd';

const About = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>About Page</h1>
      <p>Count: {count}</p>
      <Button type="primary" onClick={() => dispatch(increment())}>+1</Button>
    </div>
  );
};

export default About;
