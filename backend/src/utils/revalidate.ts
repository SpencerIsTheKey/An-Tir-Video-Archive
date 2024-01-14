import axios from "axios";
const config = require('./env.json')[process.env.ENV];

export async function revalidateEventsPage() {
   axios({
    method: 'post',
    url: `${config.FRONTEND_URL}/api/get-events`,
    headers: {
        token: config.REAVILDATION_SECRET
    }
   });
}