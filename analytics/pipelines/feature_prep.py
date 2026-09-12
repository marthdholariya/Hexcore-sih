import pandas as pd

def extract_ml_features(csv_filepath: str) -> pd.DataFrame:
    """Cleans raw skilling data into ML features for placement/attrition prediction models."""
    df = pd.read_csv(csv_filepath)
    
    # Feature transformations
    df['salary_gain'] = df['post_salary'] - df['pre_salary']
    df['is_retained_6m'] = (df['status_6m'] == 'Employed').astype(int)
    df['is_dropped_out'] = (df['status_3m'] == 'Dropped_Out').astype(int)
    
    # Select feature column output
    feature_matrix = df[[
        'trainee_id', 
        'district_code', 
        'sector_id', 
        'pre_salary', 
        'salary_gain', 
        'is_retained_6m', 
        'is_dropped_out'
    ]]
    return feature_matrix