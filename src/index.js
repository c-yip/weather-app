import './scss/styles.scss';
import * as bootstrap from 'bootstrap';
import { submitLocation, createDom, unitChoice } from './weather-fetch';

submitLocation();
unitChoice();
createDom();
