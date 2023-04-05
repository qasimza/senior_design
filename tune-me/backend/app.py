from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from recommend import recommend_songs
#import my_ml_model # import your ML model here

app = Flask(__name__)
CORS(app)

@app.route("/")
@cross_origin()
def helloWorld():
    return "Hello, cross-origin-world!"


@app.route('/songs', methods=['POST'])
def get_recommended_songs():
    # Get song name from URL parameter
    data = request.form
    song = data['song']
    artist = data['artist']
    year = data['year']
    genres = data['genres']
    themes = data['themes']
    advanced_search = data['advanced']

    print(genres, themes, advanced_search)

    recommended_songs = recommend_songs(song, artist, int(year))


    # Call your ML model to get recommended songs
    #recommended_songs = my_ml_model.get_recommendations(song_name)

    print(recommended_songs['name'].values.tolist())

    # Return recommended songs as a JSON response
    return jsonify(recommended_songs['name'].values.tolist())

if __name__ == '__main__':
    app.run(debug=True)