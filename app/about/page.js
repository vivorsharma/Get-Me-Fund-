import React from "react";

const About = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-semibold mb-4">About Get Me Fund!</h1>
            <p className="text-lg mb-6">
                Calculate Number of Digits: We calculate the number of digits in the number using a loop.
                Sum of Powers: We then calculate the sum of the digits each raised to the power equal to the number of digits.
                Comparison: Finally, we compare the sum to the original number to determine if it is an Armstrong number.
                This approach avoids using built-in functions and adheres to the constraint regarding time complexity
            </p>
            <h2 className="text-2xl font-semibold mb-4">How it works</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="flex intems-center mb-6">
                    Calculate Number of Digits: We calculate the number of digits in the number using a loop.
                    Sum of Powers: We then calculate the sum of the digits each raised to the power equal to the number of digits.
                    Comparison: Finally, we compare the sum to the original number to determine if it is an Armstrong number.
                    This approach avoids using built-in functions and adheres to the constraint regarding time complexity
                </div>
            </div>
        </div>
    )
}

export default About;

export const metadata = {
    title: "About - Get Me Fund!"
}