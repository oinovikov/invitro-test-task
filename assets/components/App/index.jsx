import React, { useContext, useState } from 'react';
import Button from '@components/Button';
import LogItem from '@components/LogItem';
import Bem from '@utils/Bem';
import Api from '@utils/Api';
import { store } from '@/store';

import './style.scss';


const bem = new Bem('app');
const ping = new Api('ping');

function App() {
  const { state: { log }, dispatch } = useContext(store);
  const [loading, setLoading] = useState(false);

  const handleButtonClick = () => {
    setLoading(true);

    // setTimeout здесь исключительно,
    // чтобы визуально показать процесс запроса.
    setTimeout(() => {
      ping.create(data => {
        console.log('data from button component', data);
        dispatch({
          type: 'unshift log',
          data,
        });
      }).then(() => {
        setLoading(false);
      });
    }, 800);
  }

  return (
    <div className={bem.block()}>
      <div className={bem.element('action')}>
        <Button loading={loading} onClick={handleButtonClick} />
      </div>

      <div className={bem.element('log')}>
        {log.map((item, i) => (
          <LogItem
            message={item.message}
            entity={item.entity}
            onAnimationEnd={() => dispatch({ type: 'pop log' })}
            key={item.entity.created_at}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
