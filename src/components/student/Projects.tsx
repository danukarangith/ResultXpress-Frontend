
const Projects = () => {
    return (
        <div className="projects-container">
            <div className="projects-header">
                <h3>Projects</h3>
                <span>30 done this month</span>
                <button className="more-btn">•••</button>
            </div>
            <div className="projects-table">
                <div className="table-header">
                    <span>Users</span>
                    <span>MEMBERS</span>
                    <span>Login</span>
                    <span>COMPLETION</span>
                </div>
                <div className="table-row">
                    <div className="company">
                        <div className="company-logo">St</div>
                        <span>STUDENTS</span>
                    </div>
                    <div className="members">
                        <div className="avatars">
                            <img src="/src/assets/454011361_473924985596223_3843676910188143213_n.jpg" alt="Member 1" />
                            <img src="/src/assets/459982761_1587074788833346_8948451419766305068_n.jpg" alt="Member 2" />
                            <img src="/src/assets/465268644_1778952845972883_4767919127432151839_n.jpg" alt="Member 3" />
                            <img src="/src/assets/336685166_723555912795517_1507288984523141097_n.jpg" alt="Member 4" />
                        </div>
                    </div>
                    <div className="budget">1000+</div>
                    <div className="completion">
                        <span>60%</span>
                        <div className="progress-bar">
                            <div className="progress" style={{ width: '60%' }}></div>
                        </div>
                    </div>
                </div>
                <div className="table-row">
                    <div className="company">
                        <div className="company-logo" style={{ backgroundColor: '#f44336' }}>AD</div>
                        <span>ADMINISTRATION</span>
                    </div>
                    <div className="members">
                        <div className="avatars">
                            <img src="/src/assets/1676870708913%20(1).jpg" alt="Member 2" />
                            <img src="/src/assets/1725288899945.jpg" alt="Member 4" />
                        </div>
                    </div>
                    <div className="budget">300+</div>
                    <div className="completion">
                        <span>10%</span>
                        <div className="progress-bar">
                            <div className="progress" style={{ width: '10%', backgroundColor: '#f44336' }}></div>
                        </div>
                    </div>
                </div>
                {/* Add more rows as needed */}
            </div>
        </div>
    );
};

export default Projects;