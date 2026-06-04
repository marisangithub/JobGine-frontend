import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { getStats } from "../services/dashboardService";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalResumes: 0,
    totalAnalyses: 0,
    averageScore: 0,
    latestAnalyses: [],
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await getStats(token);

      setStats(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DashboardLayout>
      <div className="row">

        <div className="col-md-4 mb-3">
          <div className="card shadow">
            <div className="card-body">
              <h5>Total Resumes</h5>
              <h2>{stats.totalResumes}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card shadow">
            <div className="card-body">
              <h5>Total Analyses</h5>
              <h2>{stats.totalAnalyses}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card shadow">
            <div className="card-body">
              <h5>Average ATS Score</h5>
              <h2>{stats.averageScore}%</h2>
            </div>
          </div>
        </div>

      </div>

      <div className="card shadow mt-4">
        <div className="card-body">

          <h4>Recent Analyses</h4>

          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>ATS Score</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {stats.latestAnalyses?.map((analysis) => (
                <tr key={analysis.id}>
                  <td>{analysis.id}</td>
                  <td>{analysis.ats_score}%</td>
                  <td>
                    {new Date(
                      analysis.created_at
                    ).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>

          </table>

        </div>
      </div>

    </DashboardLayout>
  );
};

export default Dashboard;