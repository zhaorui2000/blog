import './global.css';
import DelButton from './components/del-button.vue';
import Header from './components/header.vue';
import Container from './components/container.vue';
import Cell from './components/cell.vue';
import CellGroup from './components/cell-group.vue';
import Progress from './components/progress.vue';
import TimeProgress from './components/time-progress.vue';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);
export { DelButton, Header, Container, Cell, CellGroup, Progress, TimeProgress };
