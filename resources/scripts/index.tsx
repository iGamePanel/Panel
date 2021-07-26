import React from 'react';
import ReactDOM from 'react-dom';
import App from '@/components/App';
import './i18n';
import { setConfig } from 'react-hot-loader';

import 'tailwindcss/dist/base.min.css';

setConfig({ reloadHooks: false });

ReactDOM.render(<App/>, document.getElementById('app'));
