from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  

@app.route('/ping', methods=['GET'])
def ping():
    return {'message': 'pong'}

@app.route('/selected', methods=['POST'])
def selected():
    if request.is_json:
        data = request.json 
        received_text = data.get('selectedText', 'No selectedText key found')
        print(f"Received JSON data: {data}") 
        print(f"Extracted selectedText: {received_text}") 

        return jsonify({'message': f'Successfully received: {received_text}'})
    else:
        print("Received non-JSON POST request to /selected")
        return jsonify({'error': 'Request must be JSON'}), 400

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8000)