import component from './component';
import './main.css';
import 'react';
import { bake } from './shake';

bake();

document.body.appendChild(component());