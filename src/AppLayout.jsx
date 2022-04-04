import React from "react";
import { Link } from "react-router-dom";
import { Container, Card } from "reactstrap";

export default function AppLayout({ children }) {
    return (
        <>
            <Container>
                <Card className="mt-3 shadow p-3 appCard">
                    <div className="appLogoContainer mb-4">
                        <Link to="/">
                            <img className="appLogo" src=" https://images.g2crowd.com/uploads/product/image/social_landscape/social_landscape_cc23c306f0259fa0a699453822c23fae/quizizz.png" alt="quiz logo" />
                        </Link>
                    </div>


                    {children}
                </Card>
            </Container>
        </>
    );
}
