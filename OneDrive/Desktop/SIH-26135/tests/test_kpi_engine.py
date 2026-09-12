import unittest
from analytics.kpi_engine import (
    calculate_employment_rate,
    calculate_retention_rate,
    calculate_salary_hike,
    calculate_confidence_score
)

class TestKPIEngine(unittest.TestCase):
    def test_employment_rate(self):
        self.assertEqual(calculate_employment_rate(75, 100), 75.0)
        self.assertEqual(calculate_employment_rate(0, 0), 0.0)

    def test_salary_hike(self):
        self.assertEqual(calculate_salary_hike(10000, 15000), 50.0)
        self.assertEqual(calculate_salary_hike(0, 15000), 0.0)

    def test_confidence_score(self):
        self.assertEqual(calculate_confidence_score(1.0, 1.0, 1.0), 1.00)
        self.assertEqual(calculate_confidence_score(1.0, 0.0, 0.0), 0.40)

if __name__ == '__main__':
    unittest.main()