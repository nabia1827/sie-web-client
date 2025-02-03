import React, { useState, useEffect } from "react";
import { Flex, Typography } from "antd";
const { Text } = Typography;
import { CheckFat, X } from "@phosphor-icons/react";
import { colors } from "../../utils/colors";

const PasswordStrengthChecker = (props) => {
    const { password } = props;

    const [strength, setStrength] = useState("Empty");
    const [strengthCount, setStrengthCount] = useState(0);
    const [requirements, setRequirements] = useState({
        length: false,
        lowercase: false,
        uppercase: false,
        number: false,
        specialChar: false,
    });

    const checkStrength = (pwd) => {
        const length = pwd.length >= 6;
        const lowercase = /[a-z]/.test(pwd);
        const uppercase = /[A-Z]/.test(pwd);
        const number = /\d/.test(pwd);
        const specialChar = /[!@#$%^&*(),.?":{}|<>]/.test(pwd);

        setRequirements({ length, lowercase, uppercase, number, specialChar });

        let level = "Débil";
        const score = [length, lowercase, uppercase, number, specialChar].filter(
            (req) => req
        ).length;

        if (score >= 4) level = "Fuerte";
        else if (score >= 2) level = "Medio";

        setStrength(level);
    };

    useEffect(() => {
        if (password) {
            checkStrength(password)
        }else{
            resetChecker()
        }
    }, [password]);

    useEffect(() => {
        if (requirements) {
            const trueCount = Object.values(requirements).filter(value => value).length;
            setStrengthCount(trueCount);
        }
    }, [requirements]);

    const resetChecker = () =>{
        setRequirements({
            length: false,
            lowercase: false,
            uppercase: false,
            number: false,
            specialChar: false,
        })
        setStrength("Empty")
    }


    return (
        <Flex gap={"middle"} vertical justify="center" align="flex-start" style={{ width: "100%" }}>
            <Flex justify="space-between" align="center" style={{ width: "100%" }}>
                <div
                    style={{
                        width: "80px",
                        height: "8px",
                        borderRadius: "20px",
                        backgroundColor: strengthCount >= 1 ? colors.blue : colors.gray
                    }}
                >
                </div>
                <div
                    style={{
                        width: "80px",
                        height: "8px",
                        borderRadius: "20px",
                        backgroundColor: strengthCount >= 2 ? colors.blue : colors.gray
                    }}
                >
                </div>
                <div
                    style={{
                        width: "80px",
                        height: "8px",
                        borderRadius: "20px",
                        backgroundColor: strengthCount >= 3 ? colors.blue : colors.gray
                    }}
                >
                </div>
                <div
                    style={{
                        width: "80px",
                        height: "8px",
                        borderRadius: "20px",
                        backgroundColor: strengthCount >= 4 ? colors.blue : colors.gray
                    }}
                >
                </div>
                <div
                    style={{
                        width: "80px",
                        height: "8px",
                        borderRadius: "20px",
                        backgroundColor: strengthCount >= 5 ? colors.blue : colors.gray
                    }}
                >
                </div>

            </Flex>
            <Text className="sie-info-column-label" >Level: {strength}</Text>
            <Flex gap={"small"} vertical align="flex-start" justify="flex-start" style={{ width: "100%" }}>
                <Flex gap={"small"} justify="center" align="center">
                    {requirements.length ? (
                        <CheckFat color={colors.green} size={20} weight="fill" />
                    ) : (
                        <X color={colors.lightBlack} size={20} />
                    )
                    }
                    <Text style={{ color: requirements.length ? colors.green : colors.lightBlack }}>Mínimo 6 caracteres</Text>
                </Flex>
                <Flex gap={"small"} justify="center" align="center">
                    {requirements.uppercase ? (
                        <CheckFat color={colors.green} size={20} weight="fill" />
                    ) : (
                        <X color={colors.lightBlack} size={20} />
                    )
                    }
                    <Text style={{ color: requirements.uppercase ? colors.green : colors.lightBlack }}>Contiene como mínimo una mayúscula</Text>
                </Flex>
                <Flex gap={"small"} justify="center" align="center">
                    {requirements.lowercase ? (
                        <CheckFat color={colors.green} size={20} weight="fill" />
                    ) : (
                        <X color={colors.lightBlack} size={20} />
                    )
                    }
                    <Text style={{ color: requirements.lowercase ? colors.green : colors.lightBlack }}>Contiene como mínimo una minúscula</Text>
                </Flex>
                <Flex gap={"small"} justify="center" align="center">
                    {requirements.number ? (
                        <CheckFat color={colors.green} size={20} weight="fill" />
                    ) : (
                        <X color={colors.lightBlack} size={20} />
                    )
                    }
                    <Text style={{ color: requirements.number ? colors.green : colors.lightBlack }}>Contiene números</Text>
                </Flex>
                <Flex gap={"small"} justify="center" align="center" >
                    {requirements.specialChar ? (
                        <CheckFat color={colors.green} size={20} weight="fill" />
                    ) : (
                        <X color={colors.lightBlack} size={20} />
                    )
                    }
                    <Text style={{ color: requirements.specialChar ? colors.green : colors.lightBlack }}>Contiene caracteres especiales</Text>
                </Flex>
            </Flex>

        </Flex>
    );
};

export default PasswordStrengthChecker;
