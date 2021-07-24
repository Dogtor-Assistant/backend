
import bent from 'bent';

const ipApi = bent<CityResponse>('http://ip-api.com/json/', 'json', 200);

type CityResponse = {
    status: 'fail',
} | {
    status: 'success',
    city: string,
}

export async function cityForIp(ip: string): Promise<string> {
    const body = await ipApi(`${ip}?fields=status,city`);

    if (body.status !== 'success') {
        throw 'Invalid IP Address';
    }

    return body.city;
}
