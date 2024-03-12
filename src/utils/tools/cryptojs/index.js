import CryptoJS from "crypto-js";

export function encrypt(props) {
	const { payload, clientKey, sharedKey } = props;
	let key = clientKey + "Y3BtLnN5c3RlbXM" + sharedKey;
	key = CryptoJS.SHA512(key);
	key = key.toString();
	key = key.substring(32, 64);

	let encrypted = CryptoJS.AES.encrypt(JSON.stringify(payload), CryptoJS.enc.Utf8.parse(key), {
		mode: CryptoJS.mode.ECB,
		padding: CryptoJS.pad.Pkcs7
	});

	return encrypted.toString()
}

export function decrypt(props) {
	const { payload, clientKey, sharedKey } = props;
	let key = clientKey + "Y3BtLnN5c3RlbXM" + sharedKey;
	key = CryptoJS.SHA512(key);
	key = key.toString();
	key = key.substring(32, 64);

	let decrypted = CryptoJS.AES.decrypt(payload, CryptoJS.enc.Utf8.parse(key), {
		mode: CryptoJS.mode.ECB,
		padding: CryptoJS.pad.Pkcs7
	});

	return decrypted.toString(CryptoJS.enc.Utf8)
}