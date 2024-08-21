from flask import Flask, render_template, request, jsonify
import pandas as pd
import joblib
from sklearn.base import BaseEstimator, TransformerMixin
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from xgboost import XGBRegressor
import os

os.environ['CUDA_VISIBLE_DEVICES'] = '-1'


app = Flask(__name__, static_folder='static', static_url_path='')

class FeatureEngineer(BaseEstimator, TransformerMixin):
    def fit(self, X, y=None):
        return self

    def transform(self, X):
        X = X.copy()
        X['Arac_Yasi'] = 2024 - X['Yil']
        X['Yiprantis'] = X['Boya'] + X['Degisen']
        return X

categorical_cols = ['Marka', 'Model', 'Yakit', 'Sanziman', 'Kaput_Tavan']
numeric_cols = ['Yil', 'Km', 'beygir', 'Tramer', 'Hafta', 'Arac_Yasi', 'Yiprantis']

preprocessor = ColumnTransformer(
    transformers=[
        ('cat', OneHotEncoder(handle_unknown='ignore'), categorical_cols),
        ('num', StandardScaler(), numeric_cols)
    ],
    remainder='passthrough'
)

model_pipeline = Pipeline(steps=[
    ('feature_engineer', FeatureEngineer()),
    ('preprocessor', preprocessor),
    ('regressor', XGBRegressor(tree_method='hist', predictor='cpu_predictor'))
])

# Modeli yükleyin
model_pipeline = joblib.load('best_model.pkl')

def make_prediction(data):
    predictions = model_pipeline.predict(data)
    return predictions[0]

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/offer', methods=['GET', 'POST'])
def offer():
    marka = request.args.get('Marka')  
    return render_template('offer.html', Marka=marka)
   
@app.route('/manage')
def manage():
    return render_template('manage.html')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        marka = request.form['Marka']
        yil = int(request.form['Yil'])
        model = request.form['Model']
        yakit = request.form['Yakit']
        sanziman = request.form['Sanziman']
        km = int(request.form['Km'])
        beygir = int(request.form['Beygir'])
        tramer = int(request.form['Tramer'])
        hafta = int(request.form['Hafta'])
        kaput_tavan = int(request.form['Kaput_Tavan'])
        boya = int(request.form.get('Boya', 0))
        degisen = int(request.form.get('Degisen', 0))
        
        data = pd.DataFrame([{
            'Yil': yil,
            'Marka': marka,
            'Model': model,
            'Yakit': yakit,
            'Sanziman': sanziman,
            'Km': km,
            'Boya': boya,
            'Degisen': degisen,
            'Kaput_Tavan': kaput_tavan,
            'beygir': beygir,
            'Tramer': tramer,
            'Hafta': hafta
        }])
        
        price = make_prediction(data)
        return jsonify({'price': float(str(price))})
    
    except Exception as e:
        return jsonify({'error': str(e)}), 400
    
if __name__ == '__main__':
    app.run(debug=True)