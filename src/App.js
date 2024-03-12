import { useState } from "react";

import { decrypt, encrypt } from "./utils/tools/cryptojs";

import { Button, Col, Divider, Form, Input, Layout, Radio, Row, Space } from "antd";
const { TextArea } = Input;

export default function App() {
	const [form] = Form.useForm();
	const [result, setResult] = useState("");

	const handleSubmit = (target) => {
		const { sharedKey, clientKey, payload, type } = target;
		let req = {
			sharedKey,
			clientKey,
			payload,
		};

		let res = "";
		if (type === 1) res = encrypt(req)
		else res = decrypt(req)

		setResult(res)
	}

	const handleFailed = (target) => {
		console.log(target);
	}

	return (
		<Layout className="bg-white">
			<Layout.Content style={{ marginInline: "300px" }}>
				<div className="py-3">
					<h2>Encrypt and Decrypt Text</h2>
					<div>Quickly encrypt any text with a password and share with anyone</div>
				</div>
				<Divider />
				<Row gutter={[24, 24]}>
					<Col span={12}>
						<Form
							form={form}
							layout="vertical"
							autoComplete="off"
							onFinish={handleSubmit}
							onFinishFailed={handleFailed}>
							<Form.Item
								name="sharedKey"
								label="Shared Key">
								<Input />
							</Form.Item>
							<Form.Item
								name="clientKey"
								label="Client Key">
								<Input />
							</Form.Item>
							<Form.Item
								name="payload"
								label="Payload">
								<TextArea rows={5} />
							</Form.Item>
							<Form.Item
								name="type">
								<Radio.Group>
									<Radio value={1}>Encrypt</Radio>
									<Radio value={2}>Decrypt</Radio>
								</Radio.Group>
							</Form.Item>
							<Form.Item>
								<Space>
									<Button htmlType="submit" type="primary">Submit</Button>
								</Space>
							</Form.Item>
						</Form>
					</Col>
					<Col span={12}>
						<div className="mb-2">Result</div>
						<TextArea
							value={result}
							rows={10}
						/>
					</Col>
				</Row>
			</Layout.Content>
		</Layout>
	)
}