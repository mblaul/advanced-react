import CreateItem from '../components/CreateItem';
import PleaseSignIn from '../components/SignIn';

const Sell = (props) => (
  <div>
    <PleaseSignIn>
      <CreateItem />
    </PleaseSignIn>
  </div>
);

export default Sell;
